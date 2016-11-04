#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'
#dom = DOM(url.download(cached=True))

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.
    
    #list that will contain lists of tv series info
    tvseries = []
    
    #get nodes that contain info
    for i in dom.by_tag("div.lister-item-content"):
        
        #list to store info
        list = []
        
        #string that will store actors
        actors = ""
        
        #fill list
        list.append(i.by_tag("h3.lister-item-header")[0].by_tag("a")[0].content.encode("utf-8"))
        list.append(i.by_tag("div.ratings-bar")[0].by_tag("strong")[0].content)
        list.append(i.by_tag("span.genre")[0].content.strip().encode("utf-8"))
        for j in i.by_tag("p")[2].by_tag("a"):
            actors += j.content.encode("utf-8") + ", "
        list.append(actors[:-2])
        list.append(i.by_tag("span.runtime")[0].content[:-4])
        
        #append list to tvseries
        tvseries.append(list)
    
    return tvseries       
    


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    
    for i in tvseries:
        writer.writerow(i)

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)