class CampaignUtils {
	construct() {
		this.campaignData = {};
	}

	checkExist(searchString) {
		let searchArray = searchString.replace('?', '').split('&');
		let campaignExist = false;

		let searchObj = {};
		searchArray.forEach(item => {
			let itemArray = item.split('=');
			searchObj[itemArray[0]] = itemArray[1];
		});

		if (
			searchObj.utm_source &&
			searchObj.utm_medium &&
			searchObj.utm_campaign
		) {
			campaignExist = true;
			this.campaignData = searchObj;
		}

		return campaignExist;
	}

	getData() {
		return this.campaignData;
	}
}

export default new CampaignUtils();
