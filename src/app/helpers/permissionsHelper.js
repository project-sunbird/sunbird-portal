const request = require('request')
const _ = require('lodash')
const dateFormat = require('dateformat')
const uuidv1 = require('uuid/v1')
const envHelper = require('./environmentVariablesHelper.js')
const learnerURL = envHelper.LEARNER_URL
const enablePermissionCheck = envHelper.ENABLE_PERMISSION_CHECK
const apiAuthToken = envHelper.PORTAL_API_AUTH_TOKEN
const telemetryHelper = require('./telemetryHelper')
const logger = require('sb_logger_util_v2');
let PERMISSIONS_HELPER = {
  ROLES_URLS: {
    'course/create': ['CONTENT_CREATOR', 'CONTENT_CREATION', 'CONTENT_REVIEWER'],
    'course/update': ['CONTENT_CREATOR', 'CONTENT_CREATION', 'CONTENT_REVIEWER'],
    'course/review': ['CONTENT_CREATOR', 'CONTENT_CREATION', 'CONTENT_REVIEWER', 'CONTENT_REVIEW'],
    'course/publish': ['CONTENT_REVIEWER', 'CONTENT_REVIEW'],
    'content/retire': ['CONTENT_REVIEWER', 'CONTENT_REVIEW', 'FLAG_REVIEWER'],
    'content/reject': ['CONTENT_REVIEWER', 'CONTENT_REVIEW'],
    'content/create': ['CONTENT_CREATOR', 'CONTENT_CREATION', 'CONTENT_REVIEWER', 'BOOK_CREATOR'],
    'content/update': ['CONTENT_CREATOR', 'CONTENT_CREATION', 'CONTENT_REVIEWER', 'BOOK_CREATOR'],
    'content/review': ['CONTENT_CREATOR', 'CONTENT_CREATION', 'CONTENT_REVIEWER', 'CONTENT_REVIEW',
      'BOOK_CREATOR', 'BOOK_REVIEWER', 'FLAG_REVIEWER'],
    'content/publish': ['CONTENT_REVIEWER', 'CONTENT_REVIEW'],
    'content/flag/accept': ['FLAG_REVIEWER'],
    'content/flag/reject': ['FLAG_REVIEWER'],
    'organisation/update': ['ADMIN', 'ORG_MANAGEMENT'],
    'user/create': ['ADMIN',
      'ORG_MANAGEMENT',
      'ORG_ADMIN',
      'MEMBERSHIP_MANAGEMENT',
      'ORG_MODERATOR'
    ],
    'user/upload': ['ORG_ADMIN', 'SYSTEM_ADMINISTRATION'],
    'user/assign/role': ['ORG_ADMIN', 'SYSTEM_ADMINISTRATION'],
    'user/block': ['ORG_ADMIN', 'SYSTEM_ADMINISTRATION'],
    'dashboard/creation': ['ORG_ADMIN', 'SYSTEM_ADMINISTRATION'],
    'dashboard/progress': ['COURSE_MENTOR'],
    'dashboard/consumption': ['ORG_ADMIN', 'SYSTEM_ADMINISTRATION', 'CONTENT_CREATOR'],
    'org/upload': ['SYSTEM_ADMINISTRATION'],
    'upload/status/': ['ORG_ADMIN', 'SYSTEM_ADMINISTRATION'],
    'type/create': ['SYSTEM_ADMINISTRATION'],
    'type/update': ['SYSTEM_ADMINISTRATION'],
    'portal/user/v1/update': ['ORG_ADMIN']
  },

  getPermissions: function (reqObj) {
    var options = {
      method: 'GET',
      url: learnerURL + 'data/v1/role/read',
      headers: {
        'x-device-id': 'middleware',
        'x-msgid': uuidv1(),
        'ts': dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss:lo'),
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + apiAuthToken
      },
      json: true
    }
    const telemetryData = {reqObj: reqObj,
      options: options,
      uri: 'data/v1/role/read',
      userId: reqObj.session.userId}
    // telemetryHelper.logAPICallEvent(telemetryData)

    request(options, function (error, response, body) {
      telemetryData.statusCode = _.get(response, 'statusCode')
      if (!error && body && body.responseCode === 'OK') {
        // module.exports.setRoleUrls(body.result)
      } else {
        telemetryData.resp = body
        telemetryHelper.logAPIErrorEvent(telemetryData)
      }
    })
  },
  setRoleUrls: function (roleData) {
    var roles = _.cloneDeep(roleData.roles)
    _.forEach(roles, function (role) {
      var roles = [role.id]
      _.forEach(role.actionGroups, function (actionGroup) {
        roles.push(actionGroup.id)
        _.forEach(actionGroup.actions, function (action) {
          _.forEach(action.urls, function (url) {
            module.exports.ROLES_URLS[url] = module.exports.ROLES_URLS[url] || []
            module.exports.ROLES_URLS[url] = _.union(module.exports.ROLES_URLS[url], roles)
          })
        })
      })
    })
  },

  setUserSessionData (reqObj, body) {
    try {
      if (body.responseCode === 'OK') {
        reqObj.session.userId = body.result.response.identifier;
        if (body.result.response.managedBy) {
          reqObj.session.sessionIdentifier = uuidv1();
        } else {
          reqObj.session.sessionIdentifier = body.result.response.identifier;
        }
        reqObj.session.roles = body.result.response.roles
        if (body.result.response.organisations) {
          _.forEach(body.result.response.organisations, function (org) {
            if (org.roles && _.isArray(org.roles)) {
              reqObj.session.roles = _.union(reqObj.session.roles, org.roles)
            }
            if (org.organisationId) {
              reqObj.session.orgs.push(org.organisationId)
            }
          })
        }
        reqObj.session.orgs = _.uniq(reqObj.session.orgs);
        reqObj.session.orgs = _.compact(reqObj.session.orgs);
        reqObj.session.roles = _.uniq(reqObj.session.roles)
        if (body.result.response.rootOrg && body.result.response.rootOrg.id) {
          reqObj.session.rootOrgId = body.result.response.rootOrg.id
          reqObj.session.rootOrghashTagId = body.result.response.rootOrg.hashTagId
          reqObj.session.rootOrg = body.result.response.rootOrg
        }
      }
    } catch (e) {
      logger.error({msg: 'error while saving user session data', err: e})
      console.log(e)
    }
  },

  getCurrentUserRoles: function (reqObj, callback, userIdentifier) {
    var userId = userIdentifier || reqObj.session.userId;
    var options = {
      method: 'GET',
      url: learnerURL + 'user/v1/read/' + userId,
      headers: {
        'x-msgid': uuidv1(),
        'ts': dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss:lo'),
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer ' + apiAuthToken,
        'x-authenticated-user-token': reqObj.kauth.grant.access_token.token
      },
      json: true
    }
    const telemetryData = {reqObj: reqObj,
      options: options,
      uri: 'user/v1/read',
      type: 'user',
      id: userId,
      userId: userId}
    // telemetryHelper.logAPICallEvent(telemetryData)

    request(options, function (error, response, body) {
      logger.info({msg: 'user/v1/read api response', error, requestOptions: options});
      telemetryData.statusCode = _.get(response, 'statusCode');
      reqObj.session.roles = [];
      reqObj.session.orgs = [];
      if (error) {
        logger.error({msg: 'error while user/v1/read', error});
        callback(error, null)
      } else if (!error && body) {
        module.exports.setUserSessionData(reqObj, body);
        logger.info({msg: 'getCurrentUserRoles session obj', session: reqObj.session});
        reqObj.session.save(function (error) {
          if (error) {
            callback(error, null)
          } else {
            callback(null, body)
          }
        });
      } else {
        logger.error({msg: 'error while user/v1/read', error});
        callback(error, null)
      }
    })
  },
  checkPermission: function () {
    return function (req, res, next) {
      if (enablePermissionCheck && req.session['roles'] && req.session['roles'].length) {
        var roles = module.exports.checkURLMatch(req.originalUrl)
        if (_.isArray(roles)) {
          if (_.intersection(roles, req.session['roles']).length > 0) {
            next()
          } else {
            res.status(401)
            res.send({
              'id': 'api.error',
              'ver': '1.0',
              'ts': dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss:lo'),
              'params': {
                'resmsgid': uuidv1(),
                'msgid': null,
                'status': 'failed',
                'err': 'UNAUTHORIZED_ERROR',
                'errmsg': 'Unauthorized: Access is denied'
              },
              'responseCode': 'UNAUTHORIZED',
              'result': {}
            })
            res.end()
          }
        } else {
          next()
        }
      } else {
        next()
      }
    }
  },
  checkURLMatch: function (url) {
    var roles = []
    _.forEach(module.exports.ROLES_URLS, function (value, key) {
      if (url.indexOf(key) > -1) {
        roles = value
        return false
      }
    })
    if (roles.length) {
      return roles
    }
    return false
  }
}
module.exports = PERMISSIONS_HELPER
