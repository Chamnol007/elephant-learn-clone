# -*- coding: utf-8 -*-
import sys
import datetime

sys.path.append('E:/Senior Project/elephantlearn')
import scrapy
from scrapy.http import HtmlResponse
from selenium import webdriver
from pip._vendor.html5lib.constants import EOF
import time
import pandas as pd
import re
from src.utils.firebase.firebase import FirebaseHelper


class PantipSpider(scrapy.Spider):
    name = 'pantip'
    allowed_domains = ['pantip.com/topic']
    # start_urls = ['https://pantip.com/topic/39072466', 'https://pantip.com//topic/39077619']

    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': './../../../tmp/pantip_comment.csv',
        'FEED_EXPORT_ENCODING': 'utf-8'
    }

    try:
        df = pd.read_csv(r'../../../tmp/pantip_topic.csv', usecols=['post_url'])
    except:
        print('error')

    def __init__(self):
        self.firebase = FirebaseHelper()
        self.driver = webdriver.Firefox(
            executable_path=r'E:\Senior Project\elephantlearn\src\assets\geckodriver-v0.24.0-win64\geckodriver.exe')

    def start_requests(self):
        urls = self.df.values
        for url in urls:
            yield scrapy.Request(url='https://pantip.com/topic/' + re.sub(r'\D', '', url[0]), callback=self.parse)

    def parsePostByID(self, post_id):
        url = 'https://pantip.com/topic/' + post_id
        print('Go to ', url)

        data = {}

        self.driver.get(url)
        self.driver.maximize_window()
        try:
            self.scroll()
            self.hideFootBar()
            self.expandSubComment()
            data = self.extractContent(post_id)
        except:
            pass
        # try:
        #     data = self.extractContent(post_id)
        # except:
        #     pass
        print(data)
        self.driver.close()
        return data

    def extractContent(self, post_id):
        currentDateTime = datetime.datetime.now()
        currentTime = time.time()
        print(str(currentDateTime))
        print(currentTime)
        comments = self.driver.find_elements_by_class_name('display-post-story')
        comments.pop(0)
        users_id = self.driver.find_elements_by_xpath('.//div[@class="display-post-avatar-inner"]/a[1]')
        users_id.pop(0)
        comments_time = self.driver.find_elements_by_xpath('.//div[@class="display-post-avatar-inner"]/span/abbr')
        comments_time.pop(0)
        comments_data = {}
        data = zip(comments, users_id, comments_time)
        for item in data:
            id = post_id + '_' + (item[2].get_attribute('data-utime').replace('/', '_')).replace(' ', '_')
            data_comment = {
                id: {
                    "id": id,
                    "user_id": item[1].text,
                    "post_date": item[2].get_attribute('data-utime'),
                    "content": item[0].text
                }
            }
            comments_data = {**comments_data, **data_comment}

            # self.firebase.uploadDatabase('data/test-pendingComment/post/'+post_id, data_comment)
        return comments_data

    def hideFootBar(self):
        # hide footer bar
        element = self.driver.find_element_by_id("jump_paging")
        self.driver.execute_script("arguments[0].style.visibility='hidden'", element)

        """"new recent Pantip error 31/07/19"""
        login_message = self.driver.find_element_by_xpath("/html/body/div[4]/div/div/div[4]")
        self.driver.execute_script("arguments[0].style.visibility='hidden'", login_message)

        """"load sub comments"""

    def expandSubComment(self):
        more_buttons = self.driver.find_elements_by_class_name('see-more')

        for x in range(0, len(more_buttons)):
            if more_buttons[x].is_displayed():
                more_buttons[x].click()

    def scroll(self):
        while True:
            last_height = self.driver.execute_script("return document.body.scrollHeight")
            try:
                print('scroll')
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(3)
                new_height = self.driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                else:
                    last_height = new_height
                    continue
            except:
                break

    def parse(self, response):
        print('start url:', response.url)
        self.driver.get(response.url)
        self.driver.maximize_window()

        # test with set timer
        start_time = time.time()
        counter = 0

        while True:
            last_height = self.driver.execute_script("return document.body.scrollHeight")
            try:
                print('scroll')
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(3)
                new_height = self.driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                else:
                    last_height = new_height
                    continue
            except:
                break

        # hide footer bar
        element = self.driver.find_element_by_id("jump_paging")
        self.driver.execute_script("arguments[0].style.visibility='hidden'", element)

        """"new recent Pantip error 31/07/19"""
        login_message = self.driver.find_element_by_xpath("/html/body/div[4]/div/div/div[4]")
        self.driver.execute_script("arguments[0].style.visibility='hidden'", login_message)

        """"load sub comments"""

        try:
            more_buttons = self.driver.find_elements_by_class_name('see-more')

            for x in range(0, len(more_buttons)):
                if more_buttons[x].is_displayed():
                    more_buttons[x].click()
        except:
            pass

        response = HtmlResponse(self.driver.current_url, body=self.driver.page_source, encoding='utf-8',
                                request=response)
        response.selector.remove_namespaces()
        post_id = response.url.split('https://pantip.com/topic/')[1]
        title = response.xpath('//*[@id="topic-' + post_id + '"]/div/div[2]/h2/node()').extract()
        post_story = response.xpath('/html/body/div[4]/div/div/div[3]/div/div[4]/div[1]/div//text()').extract()
        post_date = response.xpath('//*[@id="topic-' + post_id + ''
                                                                 '"]/div/div[4]/div[2]/div[3]/div['
                                                                 '3]/div/span/abbr/@data-utime').extract()
        post_tags = response.xpath('/html/body/div[4]/div/div/div[3]/div/div[3]/div/div[2]/a/text()').extract()

        post_comments_time = response.xpath(
            './/div[@class="display-post-avatar-inner"]/span/abbr/@data-utime').extract()
        post_comments_time.pop(0)

        post_comments_userID = response.xpath(
            './/div[@class="display-post-avatar-inner"]/a//text()').extract()

        comments = self.driver.find_elements_by_class_name('display-post-story')

        # emotion_list = []
        #
        # emotions = response.xpath(
        #     '/html/body/div[4]/div/div/div[3]/div/div[4]/div[2]/div[4]/div[1]/a/span//text()').extract()
        #
        # emotions_count = response.xpath(
        #     '/html/body/div[4]/div/div/div[3]/div/div[4]/div[2]/div[4]/div[1]/span//text()').extract()
        # # remove first label of number of emotions
        # emotions_count.pop(0)
        # for i in range(len(emotions)):
        #     emotion_list.append({emotions[i]: emotions_count[i]})

        # print(emotion_list)

        # comments_emotions_list = []
        #
        # try:
        #     emotions = self.driver.find_element_by_class_name('/html/body/div[4]/div/div/div[6]/div/div/div[2]/div[3]/div[4]/div[1]/a/span')
        #     emotions_count = self.driver.find_elements_by_xpath('/html/body/div[4]/div/div/div[6]/div/div/div[2]/div[3]/div[4]/div[1]/span')
        #     emotions_count.pop(0)
        #     for i in range(len(emotions)):
        #         comments_emotions_list.append({emotions[i].text: emotions_count[i].text})
        # except:
        #     pass
        #
        # print(comments_emotions_list)

        # data_topic = {
        #     post_id: {
        #         'id': post_id,
        #         'user_id': post_comments_userID[0],
        #         'post_date': post_date[0],
        #         'post_tags': ','.join(str(c).strip() for c in post_tags),
        #         'post_title': title[0],
        #         'post_story': comments[0].text,
        #         'total_comment': int(len(post_comments_time)),
        #         # 'emotions': ''.join(str(c).strip() for c in emotion_list)
        #     }
        # }
        #
        # self.firebase.uploadDatabase('data/scraped/post', data_topic)
        #
        # comments.pop(0)
        # comments.pop(-1)
        # comments.pop(-1)
        # print(comments[0].text)
        #
        # post_comments_userID.pop(0)
        # if len(post_comments_userID) < len(comments):
        #     comments.pop(0)

        for i in range(len(post_comments_userID)):
            id = post_id + '_' + (post_comments_time[i].replace('/', '_')).replace(' ', '_')
            data_comment = {
                id: {
                    "id": id,
                    "user_id": post_comments_userID[i],
                    "time": post_comments_time[i],
                    "comment": comments[i].text
                }
            }

            print(data_comment)

            self.firebase.uploadDatabase('data/model/comment', data_comment)

        # items = zip(comments, post_comments_userID, post_comments_time)
        #
        # for item in items:
        #     scraped_info = {
        #         'post_id': post_id,
        #         'post_title': title,
        #         'post_date': post_date,
        #         'post_tag': ','.join(str(c).strip() for c in post_tags),
        #         'post_emotions': ','.join(str(c).strip() for c in emotion_list),
        #         'post_story': ' '.join(str(c).strip() for c in post_story),
        #         'post_comments': item[0].text,
        #         'post_comments_userID': item[1],
        #         'post_comments_time': item[2],
        #         'post_comments_emotions': ''
        #     }
        #
        #     # yield or give the scraped info to scrapy
        #     yield scraped_info

        # self.driver.close()


EOF
