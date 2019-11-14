from pythainlp.corpus import stopwords
from pythainlp import word_tokenize


class StopWord:
    def __init__(self):
        pass

    def removeStopWord(self, text):
        result = []
        for i in text:
            result.append(self.removeStopWordSingle(i))

        return list(filter(None.__ne__, result))

    def removeStopWordSingle(self, text):
        words = stopwords.words('thai')
        result = word_tokenize(text)
        temp = result.copy()
        t = result[0][-1]
        for i in result:
            if str(text).isdigit():
                pass
            else:
                if ((i.startswith(t) and i.endswith(t)) or (i in words)):
                    temp.remove(i)
        if len(temp) == 0:
            return None
        return temp[0]


if __name__ == '__main__':
    data = StopWord().removeStopWord(['รักกกกกกกก', 'แมวววววววว', 'นํา'])
    print(data)
