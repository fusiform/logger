// Configure webhook settings

module.exports = {
    url: "https://hooks.slack.com/services/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",
    user_payload: {
        "username": "User Error",
        "icon_emoji": ":cold_sweat:"
    },
    service_payload: {
      "username": "Server Error",
      "icon_emoji": ":gear:"
    },
    logs: {
      "user_log": "logs/user.log",
      "service_log": "logs/service.log",
    }
}
