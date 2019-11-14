import unittest
from src.preprocessing.data_cleaning.text_cleaning import ThaiTextCleaning


class TestDataCleaning(unittest.TestCase):

    def test_removeNoise(self):
        text_to_test = '<hml><body><a>ทำไมในรายงานข่าวถึงใช้หน่วยเงินของ USA สลับไปมา ระหว่าง ""เหรียญ"" กับ ""ดอลล่าร์สหรัฐ"</a></body></htm>'
        text_expected = 'ทำไมในรายงานข่าวถึงใช้หน่วยเงินของ USA สลับไปมา ระหว่าง ""เหรียญ"" กับ ""ดอลล่าร์สหรัฐ"'
        self.assertEqual(ThaiTextCleaning(text_to_test).removeNoise(), text_expected)

    def test_removePunctuation(self):
        text_to_test = '"เหตุผลอะไร!!! ทำไมคนไทยถึงไม่ค่อยลงทุน?'
        text_expected = 'เหตุผลอะไร ทำไมคนไทยถึงไม่ค่อยลงทุน'
        self.assertEqual(ThaiTextCleaning(text_to_test).removePunctuation(), text_expected)

    def test_removeWhiteSpace(self):
        text_to_test = 'ไซด์เวย์ มีโอกาสปรับฐาน    ถือ      ซื้อสะสม   '
        text_expected = 'ไซด์เวย์มีโอกาสปรับฐานถือซื้อสะสม'
        self.assertEqual(ThaiTextCleaning(text_to_test).removeWhiteSpace(), text_expected)

    def test_removeNumber(self):
        text_to_test = 'อยากได้เงินมาปิดหนี้บัตร ประมาณ 160.000 55555มีธนาคารไหนช่วยได้บ้างค่ะ55555'
        text_expected = 'อยากได้เงินมาปิดหนี้บัตร ประมาณ  มีธนาคารไหนช่วยได้บ้างค่ะ'
        self.assertEqual(ThaiTextCleaning(text_to_test).removeNumber(), text_expected)

    def test_Links(self):
        text_to_test = 'g https://react-bootstrap.github.io/components/forms/ g'
        text_expected = 'g  g'
        self.assertEqual(ThaiTextCleaning(text_to_test).removeLinks(), text_expected)


if __name__ == '__main__':
    unittest.main()
