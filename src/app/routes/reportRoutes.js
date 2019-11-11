const proxyUtils = require('../proxy/proxyUtils.js')
const reportHelper = require('../helpers/reportHelper.js')

module.exports = function (app) {
    app.get('/reports/:slug/:filename',
        reportHelper.isValidSlug(),
        reportHelper.azureBlobStream());

        app.get('/admin-user-reports/:slug/:filename',
            reportHelper.azureBlobStream(true))
}
