import unittest
from src.analysis.sentiment.sentiment import Sentiment


class TestSentiment(unittest.TestCase):

    def test_sentiment(self):
        text_to_test = 'ฉันรักเธอ'
        expected = 1
        self.assertEqual(Sentiment.sentiment(text_to_test), expected)

if __name__ == '__main__':
    unittest.main()
