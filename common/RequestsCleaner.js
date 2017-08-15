class RequestsCleaner {
	/**
	 * @param {*} calls
	 * @param {number} intervalMs
	 * @param {number} timeoutMs
	 */
	constructor(calls, intervalMs, timeoutMs) {
		this.calls = calls;
		this.intervalMs = intervalMs;
		this.timeoutMs = timeoutMs;
		this.cleanInterval = null;
	}

	start() {
		if (this.cleanInterval) {
			throw new Error('Requests cleaner is already running');
		}
		this.cleanInterval = setInterval(this.verifySignatures, this.intervalMs);
	}

	stop() {
		clearInterval(this.cleanInterval);
		this.cleanInterval = null;
	}

	/**
	 * @param {string} signature
	 * @param {number} timeout
	 * @returns {boolean}
	 */
	static isOutdated(signature, timeout) {
		const signatureTime = +signature.slice(0, 13);
		if (isNaN(signatureTime)) {
			throw new Error('Wrong signature stored in internal RPC calls');
		}
		const timeElapsed = (new Date()).getTime() - signatureTime;
		return timeElapsed > timeout;
	}

	/* eslint class-methods-use-this: 0 */
	verifySignatures() {
		throw new Error('getSignature needs to be overwritten');
	}
}

module.exports = RequestsCleaner;