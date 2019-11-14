import unittest
from src.preprocessing.tokenize.tokenization import Tokenization

class TestTokenization(unittest.TestCase):

    def test_tokenize(self):
        text_to_test = 'รบกวนข้อมูลหน่อยครับ ทำสัญญาไว้ 6 ปี ปัจจุบันผ่อนเดือนล่ะ 15,719  บาท ครับ'
        text_expected = ['รบกวน', 'ข้อมูล', 'หน่อย', 'ครับ', 'ทำสัญญา', 'ไว้', '6', 'ปี', 'ปัจจุบัน', 'ผ่อน', 'เดือน', 'ล่ะ', '15,719', 'บาท', 'ครับ']
        self.assertEqual(Tokenization.tokenize(text_to_test), text_expected)

if __name__ == '__main__':
    unittest.main()