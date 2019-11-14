import unittest
from src.preprocessing.stemming.stemming import Stemming

class TestStemming(unittest.TestCase):

    def test_stemming(self):
        text_to_test = ['เชียงใหม่','จังหวัดเชียงใหม่']
        text_expected = ['เชียงใหม่']
        self.assertEqual(Stemming().stemming(text_to_test), text_expected)

if __name__ == '__main__':
    unittest.main()