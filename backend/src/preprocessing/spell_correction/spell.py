from pythainlp import spell, correct

class SpellCorrection:
    def __init__(self):
        pass

    def checkAvailableSpell(text):
        return spell(text)

    def getCorrection(text):
        if str(text).isdigit():
            return text
        return correct(text)