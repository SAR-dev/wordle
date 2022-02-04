from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

word_of_the_day = "World"

@app.get("/")
def read_root():
    return {"Hello": "Wordle"}


@app.get("/check/{word}")
def read_item(word: str):
    array = []
    word_of_the_day = ""
    with open('words.txt', 'r') as file:
        data = file.read().rstrip().split()
        day_of_year = datetime.now().timetuple().tm_yday
        word_of_the_day = data[day_of_year % len(data)]
        
    res = ['o', 'o', 'o', 'o', 'o']
    # c = correct letter + correct position
    # w = correct letter + wrong position
    # o = wrong letter
    
    for element in range(0, len(word_of_the_day)):
        if(word_of_the_day[element].lower() == word[element].lower()):
            res[element] = 'c'
        elif(word[element].lower() in word_of_the_day.lower()):
            res[element] = 'w'
        
    return {"result": res}