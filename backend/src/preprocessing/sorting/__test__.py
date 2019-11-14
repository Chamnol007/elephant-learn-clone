import unittest
from src.preprocessing.sorting.sorting import Sorting


class TestSorting(unittest.TestCase):

    def test_sort(self):
        text_to_test = ["ค้อน", "กระดาษ", "กรรไกร", "ไข่", "ผ้าไหม"]
        text_expected = ['กรรไกร', 'กระดาษ', 'ไข่', 'ค้อน', 'ผ้าไหม']
        self.assertEqual(Sorting.sort(text_to_test), text_expected)

    def test_sortReverse(self):
        text_to_test = ["ค้อน", "กระดาษ", "กรรไกร", "ไข่", "ผ้าไหม"]
        text_expected = ['ผ้าไหม', 'ค้อน', 'ไข่', 'กระดาษ', 'กรรไกร']
        self.assertEqual(Sorting.sortReverse(text_to_test), text_expected)

if __name__ == '__main__':
    unittest.main()
