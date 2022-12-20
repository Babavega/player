! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.VlitejsYoutube = t() : e.VlitejsYoutube = t()
}(globalThis, (() => {
    return e = {
        277: (e, t, i) => {
            var n;
            n = function(e, t) {
                "use strict";
                t.default = function(e) {
                    if (window.VlitejsYoutubeQueue = window.VlitejsYoutubeQueue || [], void 0 === window.YT) {
                        const e = document.createElement("script");
                        e.async = !0, e.type = "text/javascript", e.src = "https://youtube.com/iframe_api", window.onYouTubeIframeAPIReady = () => {
                            window.VlitejsYoutubeQueue.forEach((e => {
                                e.initYoutubePlayer().then((() => {
                                    e.onReady()
                                }))
                            })), window.VlitejsYoutubeQueue = []
                        }, document.getElementsByTagName("body")[0].appendChild(e)
                    }
                    return class extends e {
                        constructor(e) {
                            super(e);
                            const t = {
                                autohide: 1,
                                controls: 0,
                                fs: this.options.fullscreen ? 1 : 0,
                                modestbranding: 0,
                                playsinline: this.options.playsinline ? 1 : 0,
                                rel: 0,
                                showinfo: 0,
                                wmode: "transparent"
                            };
                            this.params = Object.assign(Object.assign({}, t), this.options.providerParams)
                        }
                        init() {
                            this.waitUntilVideoIsReady().then((() => {
                                super.onReady()
                            }))
                        }
                        waitUntilVideoIsReady() {
                            return new window.Promise((e => {
                                void 0 !== window.YT ? this.initYoutubePlayer().then(e) : window.VlitejsYoutubeQueue.push(this)
                            }))
                        }
                        initYoutubePlayer() {
                            return new window.Promise((e => {
                                this.instance = new window.YT.Player(this.media.getAttribute("id"), {
                                    videoId: this.media.getAttribute("data-youtube-id"),
                                    height: "100%",
                                    width: "100%",
                                    playerVars: this.params,
                                    events: {
                                        onReady: t => {
                                            this.media = t.target.getIframe(), e()
                                        },
                                        onStateChange: e => this.onPlayerStateChange(e)
                                    }
                                })
                            }))
                        }
                        onPlayerStateChange(e) {
                            switch (this.rafPlaying && window.cancelAnimationFrame(this.rafPlaying), e.data) {
                                case window.YT.PlayerState.ENDED:
                                    super.onMediaEnded();
                                    break;
                                case window.YT.PlayerState.PLAYING:
                                    super.loading(!1), this.options.controls && window.requestAnimationFrame(this.onRafPlaying.bind(this));
                                    break;
                                case window.YT.PlayerState.BUFFERING:
                                    super.loading(!0)
                            }
                        }
                        onRafPlaying() {
                            super.onTimeUpdate(), this.isPaused || (this.rafTimeout = setTimeout((() => {
                                this.rafPlaying = window.requestAnimationFrame(this.onRafPlaying.bind(this))
                            }), 100))
                        }
                        getInstance() {
                            return this.instance
                        }
                        getCurrentTime() {
                            return new window.Promise((e => e(this.instance.getCurrentTime())))
                        }
                        getDuration() {
                            return new window.Promise((e => e(this.instance.getDuration())))
                        }
                        methodPlay() {
                            this.instance.playVideo()
                        }
                        methodPause() {
                            this.instance.pauseVideo()
                        }
                        methodSetVolume(e) {
                            this.instance.setVolume(100 * e)
                        }
                        methodGetVolume() {
                            return new window.Promise((e => e(this.instance.getVolume() / 100)))
                        }
                        methodMute() {
                            this.instance.mute()
                        }
                        methodUnMute() {
                            this.instance.unMute()
                        }
                        methodSeekTo(e) {
                            null !== this.isPaused || this.options.muted || (this.mute(), this.play()), this.instance.seekTo(e), super.onTimeUpdate()
                        }
                        destroy() {
                            clearTimeout(this.rafTimeout), this.instance.destroy(), super.destroy()
                        }
                    }
                }
            }.apply(t, [i, t]), void 0 === n || (e.exports = n)
        }
    }, t = {}, i = function i(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var s = t[n] = {
            exports: {}
        };
        return e[n](s, s.exports, i), s.exports
    }(277), i = i.default;
    var e, t, i
}));
