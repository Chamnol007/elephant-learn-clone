import unittest
from src.preprocessing.pos.pos import POSTagging


class TestPOS(unittest.TestCase):

    def test_getPOSTagging(self):
        text_to_test = ["การ", "เดินทาง"]
        text_expected = [('การ', 'FIXN'), ('เดินทาง', 'VACT')]
        self.assertEqual(POSTagging.getPOSTagging(text_to_test), text_expected)


if __name__ == '__main__':
    unittest.main()
