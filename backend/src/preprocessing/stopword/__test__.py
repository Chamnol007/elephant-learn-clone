import unittest
from src.preprocessing.stopword.stopword import StopWord


class TestStopWord(unittest.TestCase):

    def test_stopword(self):
        text_to_test = ['รักกกกกกกก', 'แมวววววววว']
        text_expected = ['รัก', 'แมว']
        self.assertEqual(StopWord().removeStopWord(text_to_test), text_expected)


if __name__ == '__main__':
    unittest.main()
