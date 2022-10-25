# -*- coding: utf-8 -*-
"""
Created on Tue Oct 25 13:55:40 2022

@author: Pporras
"""

# import modules
import arcgis
from arcgis.gis import GIS
from IPython.display import clear_output,display
import ipywidgets as widgets
from arcgis import features
import csv
from arcgis.geoanalytics import manage_data
from arcgis.features import FeatureLayer
import urllib.request
import io
import requests
import pandas as pd
import os
from os import path
from io import StringIO
from arcgis import geometry #use geometry module to project Long,Lat to X and Y
from copy import deepcopy
from datetime import datetime, timedelta, date
import numpy as np
from dateutil.relativedelta import relativedelta, MO

#Descarga de datos portal de la FAO de los ultimos 4 meses
#https://europe-west1-fao-empres-re.cloudfunctions.net/getEventsInfluenzaAvian?start_date=2021-07-22&end_date=2021-10-22&serotype=all&diagnosis_status=confirmed&animal_type=all
# url = 'https://us-central1-fao-empres-re.cloudfunctions.net/getEventsASF' 5/31/2022

today = date.today()
today_str = str(today)
past_months = str(today + relativedelta(months=-1)) 

# today = date.today()
# today_str = '2022-09-06'
# past_months = '2022-05-18'

start_url = 'https://europe-west1-fao-empres-re.cloudfunctions.net/getEventsInfluenzaAvian?start_date='
start_date = past_months
m_url = '&end_date='
end_date = today_str
end_url = '&serotype=all&diagnosis_status=confirmed&animal_type=all'

url = start_url+start_date+m_url+end_date+end_url

datos= urllib.request.urlopen(url)
datos=pd.read_csv(StringIO(bytearray(datos.read()).decode("utf-8")),encoding=("ISO-8859-1"))

# Añadir "NULL" a los datos vacios 
datos = datos.fillna('NULL')

#Filtro para quedarnos con la primera palabra en el campo de species

species = [j.split(',') for j in datos.species]

species2 = []
species3 = []

for animal in species:
    
    species2.append(animal[0])
    
    if len(animal) == 2:

        species3.append(animal[1])     
    
    else: 
        
        species3.append('NULL')       
        

datos['species'] = species2
datos['species_name'] = species3

# #redondear lat y lon para solucionar problema a la hora de subir el csv a Portal
datos['lat'] = datos['lat'].apply(lambda x: np.round(x, decimals=2))
datos['lon'] = datos['lon'].apply(lambda x: np.round(x, decimals=2))

