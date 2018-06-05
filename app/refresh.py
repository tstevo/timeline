import tweepy
from datetime import datetime
import time
import twconfig as cfg

# run every 15 minutes because of api rate limiting.

ckey = cfg.twitter['consumer_key']
csecret = cfg.twitter['consumer_secret']
atoken = cfg.twitter['access_token']
atokensecret = cfg.twitter['access_token_secret']

# OAuth process, using the keys and tokens
auth = tweepy.OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, atokensecret)
api = tweepy.API(auth)


def createlist():
    tweetlist = []
    i = 1
    for tweet in tweepy.Cursor(api.home_timeline, tweet_mode="extended").items(15):
        tweet_images = []
        tweet_urls = []
        try:
            media = tweet.extended_entities["media"]
            for image in (m["media_url"] for m in media):
                tweet_images.append(image)
        except:
            tweet_images = '#'
        try:
            urls = tweet.entities["urls"]
            for url in (urldict["url"] for urldict in urls):
                tweet_urls.append(str(url))
        except:
            print "no url"
            tweet_urls = '#!'
        tweetlist.append({
            "index": i,
            "date": tweet.created_at.isoformat(),
            "idstr": tweet.id_str,
            "person": tweet.user.screen_name,
            "text": tweet.full_text.split('https', 1)[0],
            "images": tweet_images,
            "url": tweet_urls})
        i += 1
    return tweetlist
