import pandas as pd


class FileRead:
    def __init__(self):
        pass

    def readCSV(filePath, columns):
        try:
            df = pd.read_csv(filePath, usecols=columns)
            return df
        except (FileNotFoundError, FileExistsError):
            print('can notread csv file')

        return None
