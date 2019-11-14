import unittest
from src.statistic.statistic import Statistic
from src.utils.fileReadAndWrite.read import FileRead


class TestSentiment(unittest.TestCase):

    def test_sentiment(self):
        df = FileRead.readCSV(r'../../tmp/pantip_topic.csv', ['user_id', 'post_date'])
        self.assertEqual(Statistic(df).generateGraph(), None)

if __name__ == '__main__':
    unittest.main()
