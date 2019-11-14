from pythainlp import word_tokenize
from pythainlp.corpus import provinces

class Stemming:
    def __init__(self):
        pass

    def stemming(self, text):
        result = []
        for i in text:
            result.append(self.stemmingSingle(i))
        return list(dict.fromkeys(result))

    def stemmingSingle(self, text):
        result = word_tokenize(text)
        temp = result.copy()
        t = ''
        for i in result:
            if(i == 'จังหวัด' or i == 'ที่'):
                temp.remove(i)

        return temp[0]

if __name__ == '__main__':
    data = Stemming().stemming(['เชียงใหม่','จังหวัดเชียงใหม่'])
    print(data)
