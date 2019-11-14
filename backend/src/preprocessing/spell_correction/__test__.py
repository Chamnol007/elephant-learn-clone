import unittest
from src.preprocessing.spell_correction.spell import SpellCorrection

class TestSpelling(unittest.TestCase):

    def test_checkAvailableSpell(self):
        text_to_test = 'เหลืยม'
        text_expected = ['เหลียม', 'เหลือม']
        self.assertEqual(SpellCorrection.checkAvailableSpell(text_to_test), text_expected)

    def test_getCorrection(self):
        text_to_test = 'เหลืยม'
        text_expected = 'เหลียม'
        self.assertEqual(SpellCorrection.getCorrection(text_to_test), text_expected)

if __name__ == '__main__':
    unittest.main()