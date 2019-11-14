import re
import string


class ThaiTextCleaning:
    def __init__(self, text):
        self.text = text

    def removeNoise(self):
        # rules = [
        #     {r'>\s+': u'>'},  # remove spaces after a tag opens or closes
        #     {r'\s+': u' '},  # replace consecutive spaces
        #     {r'\s*<br\s*/?>\s*': u'\n'},  # newline after a <br>
        #     {r'</(div)\s*>\s*': u'\n'},  # newline after </p> and </div> and <h1/>...
        #     {r'</(p|h\d)\s*>\s*': u'\n\n'},  # newline after </p> and </div> and <h1/>...
        #     {r'<head>.*<\s*(/head|body)[^>]*>': u''},  # remove <head> to </head>
        #     {r'<a\s+href="([^"]+)"[^>]*>.*</a>': r'\1'},  # show links instead of texts
        #     {r'[ \t]*<[^<]*?/?>': u''},  # remove remaining tags
        #     {r'^\s+': u''}  # remove spaces at the beginning
        # ]
        # for rule in rules:
        #     for (k, v) in rule.items():
        #         regex = re.compile(k)
        #         text = regex.sub(v, text)
        # text = text.rstrip()
        TAG_RE = re.compile(r'<[^>]+>')

        return TAG_RE.sub('', self.text)

    def removeNumber(self):
        # print(re.sub(r'[\d+][^5]', '', self.text).replace(',', ''))
        # return re.sub(r'\d+', '', self.text).replace(',', '').replace('.','')
        return re.sub(r'[\d+][^5]', '', self.text).replace(',', '')

    def removePunctuation(self):
        return ''.join(c for c in self.text if c not in string.punctuation)

    def removeWhiteSpace(self):
        return self.text.strip()

    def removeLinks(self):
        return re.sub('http[s]?://\S+', '', self.text)

    def clean(self):
        self.text = self.removeNoise()
        self.text = self.removeLinks()
        self.text = self.removePunctuation()
        self.text = self.removeWhiteSpace()
        self.text = self.removeNumber()
        return self.text
