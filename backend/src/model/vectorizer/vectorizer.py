from sklearn.feature_extraction.text import CountVectorizer


class Vectorizer:
    def __init__(self, corpus):
        self.corpus = corpus
        self.vec = None

    def my_tokenizer(self, doc):
        return str(doc).split(',')

    def transform(self):
        self.vec = CountVectorizer(tokenizer=self.my_tokenizer)
        self.vec.fit_transform(self.corpus).todense()

    def getWords(self):
        return self.vec.vocabulary_


if __name__ == '__main__':
    mockData = ['จขกท อายุ22ค่ะ แต่มีภาระเกินตัว รับผิดชอบหลายอย่าง ตอนนี้สมองตันมากค่ะ '
                'อยากหารายได้เสริมกับไอเดียดีๆมาทำการค้าขาย ซึ่งอยากขอคำแนะว่าจะค้ายขายอะไรดี '
                'วิธีการขายการโปรโมทหรือการจัดกิจกรรมแบบไหนดี ที่คนทุกแบบสามารถเข้าถึงได้ทั้งช่วงอายุและฐานะค่ะ',
                'ผ่านมาสารพัดอาชีพ แต่รุ่งเพราะ “ลูกชิ้นปิ้ง” พร้อมผุดแฟรนไชส์-ทุนหลักพันขายได้'
                ]
    Vectorizer(mockData).transform()
