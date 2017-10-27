'use strict'

angular.module('playerApp')
  .service('announcementService', ['httpServiceJava', 'config', function (httpServiceJava, config) {
    /**
     * @class announcementService
     * @desc Service to manage announcement.
     * @memberOf Services
     */

    /**
     * @method getOutBoxAnnouncementList
     * @desc Get announcement outbox list data
     * @memberOf Services.announcementService
     * @param {Object}   req - Request Object
     * @param {string}  datasetType - Data type
     * @returns {Promise} Promise object represents announcement outbox list dashboard data
     * @instance
     */
    this.getOutBoxAnnouncementList = function () {
      // return httpServiceJava.get(config.URL.DASHBOARD.ORG_CREATION + '/' + req.org_id + '?period=' + req.period);

      return '{"id":"api.plugin.announcement.user.outbox","ver":"1.0","ts":"2017-10-2417:30:23:540+0530","params":{"resmsgid":"ea764b40-b8b2-11e7-ba5b-1991e583a6a8","msgid":null,"status":"successful","err":"","errmsg":""},"responseCode":"OK","result":{"announcements":[{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/png"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"2","sourceId":"some-organisation-id","createdBy":"Creator","createdOn":"2017-10-25","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus1","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]}]}}'
    }

    /**
     * @method getInboxAnnouncementList
     * @desc Get announcement inbox list data
     * @memberOf Services.announcementService
     * @param {Object}   req - Request Object
     * @param {string}  datasetType - Data type
     * @returns {Promise} Promise object represents announcement inbox list dashboard data
     * @instance
     */
    this.getInboxAnnouncementList = function () {
      // return httpServiceJava.get(config.URL.DASHBOARD.ORG_CREATION + '/' + req.org_id + '?period=' + req.period);

      return '{"id":"api.plugin.announcement.user.outbox","ver":"1.0","ts":"2017-10-2417:30:23:540+0530","params":{"resmsgid":"ea764b40-b8b2-11e7-ba5b-1991e583a6a8","msgid":null,"status":"successful","err":"","errmsg":""},"responseCode":"OK","result":{"announcements":[{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://google.com","https://yahoo.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"abcjhfhfhfhdddddddddgkgkggh.jpg","downloadURL":"https://linktoattachment","mimetype":"application/jpeg"},{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"Although the phrase is nonsense, it does have a long history. The phrase has been used for several centuries by typographers to show the most distinctive features of their fonts. It is used because the letters involved and the letter spacing in those combinations reveal, at their best, the weight, design, and other important features of the typeface","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/png"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/jpg"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"1","sourceId":"some-organisation-id","createdBy":"Creator1","createdOn":"2017-10-24","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/pdf"}]},{"announcementId":"2","sourceId":"some-organisation-id","createdBy":"Creator","createdOn":"2017-10-25","readBy":["1234-12341-12313-132123","1234-12341-12313-324234"],"type":"announcement","links":["https://linksToOtheresources.com"],"title":"MonthyStatus1","description":"somedescription","target":["teachers"],"attachments":[{"title":"circular.pdf","downloadURL":"https://linktoattachment","mimetype":"application/jpeg"}]}]}}'
    }

    /**
     * @method getFileExtension
     * @desc Get file extension
     * @memberOf Services.announcementService
     * @param {string}  mimeType - Mime type
     * @returns {string} returns extension of a file
     * @instance
     */
    this.getFileExtension = function (mimeType) {
      var extension = mimeType === 'application/pdf' ? 'PDF' : (mimeType === 'application/png' ? 'PNG' : 'JPEG')
      return extension;
    }
    
    /**
     * @method createAnnouncement
     * @desc Send announcement data to API
     * @memberOf Services.announcementService
     * @param {object}  req - Announcement form post value
     * @returns {object} returns response of API
     * @instance
     */
    this.createAnnouncement = function (req) {
      
    }
  }])
