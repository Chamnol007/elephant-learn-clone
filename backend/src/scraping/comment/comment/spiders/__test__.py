import unittest
from src.scraping.comment.comment.spiders.pantip import PantipSpider
import json


class MyTestCase(unittest.TestCase):
    def test_parsePostByID(self):
        post_id = '39052854'
        expected_result = {'39052854_07_14_2019_06:27:51': {'id': '39052854_07_14_2019_06:27:51', 'user_id': 'สมาชิกหมายเลข 4563750', 'post_date': '07/14/2019 06:27:51', 'content': 'p/bv\nprice/book value\nหาเองโดยไปดูราคาตลาด (market cap)หารด้วยส่วนของผู้ถือหุ้น\nmarket cap ไม่มีบอก ก็ไปดูจำนวนหุ้นทั้งหมด คูณราคาปัจจุบัน\nแต่ตัวนี้ ไปหาแล้ว ไม่เจอจำนวนหุ้นทั้งหมดเหมือนกันแฮะ\n\nเหมาะแล้วที่เป็นหุ้น sp ฮาาาาา\nแก้ไขข้อความเมื่อ 14 กรกฎาคม เวลา 06:28 น.'}, '39052854_07_14_2019_11:01:58': {'id': '39052854_07_14_2019_11:01:58', 'user_id': 'Phunmet', 'post_date': '07/14/2019 11:01:58', 'content': 'หาเองได้ครับ แต่ที่ไม่แสดงค่าน่าจะมาจากการถูก SP มานาน...ข้อมูลอาจจะไม่ต่อเนื่อง\n\nไปดูที่งบการเงิน Q119\n\nจำนวนหุ้นอยู่ที่ 6,875,204,000 หุ้น*ราคาล่าสุด 0.15 ดังนั้น MKT CAP อยู่ที่ 1,031,280,600 บาท ดูในงบจะเห็นส่วนของผู้ถือหุ้นหรือ BV อยู่ที่ 1,653,140,000.-บาท ดังนั้น P/BV = 1031280600/1653140000 = 0.6238 เท่า'}, '39052854_07_15_2019_12:00:48': {'id': '39052854_07_15_2019_12:00:48', 'user_id': 'นักธุรกิจรายย่อย', 'post_date': '07/15/2019 12:00:48', 'content': 'ระวัง book value ที่มันไม่ value นะครับ'}}
        self.assertEqual(PantipSpider().parsePostByID(post_id), expected_result)


if __name__ == '__main__':
    unittest.main()
