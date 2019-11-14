# -*- coding: utf-8 -*-
import scrapy
from pip._vendor.html5lib.constants import EOF


class PantipScrapingSpider(scrapy.Spider):
    name = 'pantip_scraping'
    # DOWNLOAD_DELAY = 1.0

    allowed_domains = ['pantip.com/sinthorn/',
                       'pantip.com']

    start_urls = ['https://pantip.com/forum/sinthorn']

    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': 'tmp/pantip.csv',
        'FEED_EXPORT_ENCODING': 'utf-8'
    }

    # scraping posts' topic
    def parse(self, response):
        response.selector.remove_namespaces()

        post_urls = response.xpath('//*[@id="show_topic_lists"]/div/div/a/@href').extract()
        # post_title = response.xpath('//*[@id="show_topic_lists"]/div/div/a/text()').extract()
        # post_date = response.xpath('//*[@id="show_topic_lists"]/div/div/span[2]/abbr/@data-utime').extract()
        # print((post_urls))
        for topic_link in post_urls:
            # go to get comment from post
            yield response.follow(
                'https://pantip.com'+topic_link,
                callback=self.parse_post_comment
            )

    def parse_post_comment(self, response):
        response.selector.remove_namespaces()
        post_id = response.url.split('https://pantip.com/topic/')[1]
        title = response.xpath('//*[@id="topic-' + post_id + '"]/div/div[2]/h2/text()').extract()
        post_story = response.xpath('//*[@id="topic-'+post_id + '"]/div/div[4]/div[1]/div/text()').extract()
        post_date = response.xpath('//*[@id="topic-'+post_id + ''
                                                               '"]/div/div[4]/div[2]/div[3]/div['
                                                               '3]/div/span/abbr/@data-utime').extract()

        # retrieve all comments in post and remove first one since it is post story
        post_comments = response.css('.display-post-story:nth-child(1n+2) ::text').extract()
        # post_comments.pop(0)
        post_comments_time = response.css('.display-post-timestamp:nth-child(1n+2) ::attr(data-utime)').extract()
        print(post_comments)
        print(post_comments_time)

        items = zip(title, post_date, post_story, post_comments)

        for item in items:
            scraped_info = {
                'title': item[0],
                'post_date': item[1],
                'post_story': item[2],
                'comments': '&*&*&'.join(str(c) for c in post_comments)
            }

            # yield or give the scraped info to scrapy
            yield scraped_info


EOF
