# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import HtmlResponse
from selenium import webdriver
from pip._vendor.html5lib.constants import EOF
import time


class PantipSpider(scrapy.Spider):
    name = 'pantip'
    allowed_domains = ['pantip.com/forum/sinthorn']
    start_urls = ['http://pantip.com/forum/sinthorn/']

    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': './../../../tmp/pantip_topic.csv',
        'FEED_EXPORT_ENCODING': 'utf-8'
    }

    def __init__(self):
        self.driver = webdriver.Firefox(executable_path=r'E:\Senior Project\elephantlearn\src\assets\geckodriver-v0.24.0-win64\geckodriver.exe')

    def parse(self, response):
        self.driver.get(response.url)

        # test with set timer
        start_time = time.time()
        counter = 0

        while True:
            last_height = self.driver.execute_script("return document.body.scrollHeight")
            try:
                print('scroll')
                counter += 1
                # break with counter of scrolling time
                if counter > 10:
                    break
                current_time = time.time()
                # print(current_time-start_time)
                # break with timer
                # if current_time - start_time > 10:
                #     break
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(3)

                new_height = self.driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    if self.driver.find_elements_by_css_selector('#index-main > div.loadmore-bar.indexlist > a'):
                        print('found')
                        self.driver.find_element_by_xpath('/html/body/div[4]/div[2]/div/div/div[6]/div/div[4]/a').click()
                        time.sleep(3)
                        new_height = self.driver.execute_script("return document.body.scrollHeight")
                        print(new_height, last_height)
                        continue
                    else:
                        break
                else:
                    last_height = new_height
                    continue
            except:
                break

        response = HtmlResponse(self.driver.current_url, body=self.driver.page_source, encoding='utf-8', request=response)
        response.selector.remove_namespaces()
        post_urls = response.xpath('//*[@id="show_topic_lists"]/div/div/a/@href').extract()
        post_title = response.xpath('//*[@id="show_topic_lists"]/div/div/a/text()').extract()
        post_date = response.xpath('//*[@id="show_topic_lists"]/div/div/span[2]/abbr/@data-utime').extract()
        post_user_id = response.xpath('//*[@id="show_topic_lists"]/div/div/span[1]/text()').extract()

        items = zip(post_user_id, post_date, post_urls, post_title)

        for item in items:
            scraped_info = {
                'user_id': item[0],
                'post_date': item[1],
                'post_url': 'https://pantip.com' + item[2],
                'post_title': item[3].strip()
            }
            yield scraped_info
        self.driver.close()

EOF