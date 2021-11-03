const { writeFile, readFile, readdir, rm } = require('fs/promises');


class SimpleDb {
  // constructor(rootDir)
  constructor(rootdir){
    // Allows creation via new SimpleDb(rootDir). The rootDir is will be the folder in which files will be saved.
    // Confused about what I'm supposed to do here. Is this correct? Should I be creating the UID and joining it here? That wouldn't allow 
    this.rootdir = rootdir;
  }
    
  // .save(<objectToSave>)
  save(obj){
    // Assigns a unique id property to the object (this will mutate the incoming object)
    obj.id = Math.floor(Math.random() * 100000);
    // Serializes, the object using JSON.stringify..
    return this.writeSerializedFile(obj);
  }
    
  // .get(<id>)
  get(id){
    // Reads the contents of the JSON file with the corresponding ID
    return readFile(`${this.rootdir}/${id}.json`)
      .then((serialfileContents) => JSON.parse(serialfileContents))
      .catch((err) => {
        if (err.code === 'ENOENT') return null;
        throw(err);
      });
  }
    
  // .getAll()
  getAll(){
    // Returns an array of all the objects in the directory, deserialized from the corresponding files in the directory.
    return readdir(this.rootdir)
    // The work to retrieve the files should be done in parallel (Promise.all)
      .then((response) => Promise.all(
        response.map(item => readFile(`${this.rootdir}/${item}`)
          .then((response) => JSON.parse(response)))
      ));
  }
        
  // STRETCH .remove(<id>)
  remove(id){
    // Remove the JSON file with the corresponding ID.
    return rm(`${this.rootdir}/${id}.json`);
  }

  // STRETCH .remove(<id>)
  edit(obj){
    return this.writeSerializedFile(obj);
  }

  writeSerializedFile(obj) {
    // Serializes, the object using JSON.stringify..
    const serializedObj = JSON.stringify(obj);
    // and saves to a JSON file named with the id and having a .json file extension
    return writeFile(`${this.rootdir}/${obj.id}.json`, serializedObj);
  }
}
    
module.exports = SimpleDb;
