// Set all blacklisted headers as lowercase
const ALLOWED = [
	'server',
];

module.exports = {
	// Since prerender does not forward headers, this causes problems for some crawlers looking for
	// e.g. localized content. This plugin ensures the headers sent to prerender are also set in
	// the Chrome instance. Some headers may be blacklisted and will not be forwarded.
	pageLoaded(req, res, next) {
		Object.entries(req.prerender.headers)
			.filter(([key]) => ALLOWED.includes(key.toLowerCase()))
			.forEach(([key, value]) => res.setHeader(`X-Origin-${key}`, value));
		next();
	}
};
