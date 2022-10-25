

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

