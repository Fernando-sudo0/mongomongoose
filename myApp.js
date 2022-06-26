require('dotenv').config();
const mongoose = require('mongoose');
const config = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true 
};
 mongoose.connect(process.env.MONGO_URI, config);


 let personSchema  = new mongoose.Schema({
     name : {type : String, required : true }, 
     age : Number,
     favoriteFoods : [String]
   })
   
   const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
const person1 = new Person({name : 'Ricky', age : 74, favoriteFoods  : [ "Empanadas", "Pozole", "French fries"]});

person1.save(function(err, data){
  if(err) return console.error(err);
  done(null , data);
  
});

};

const createManyPeople = (arrayOfPeople, done) => {

    Person.create(arrayOfPeople,function(err, data){
      if(err) {
        console.log(err);
        return console.error(err);
      }
      else{

        done(null , data);
      }
    })

};
 
const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, function(err, data){
      if(err) return console.log(err);
      done(null , data);
  }
  )
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function(err, data){
    if(err) return console.log(err);
    done(null , data);
    
  })
};

const findPersonById = (personId, done) => {
Person.findById(personId, function(err, data){
  if(err) return console.log(err);
  done(null , data);
  
})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
   
    person.save((err,data) => {
      if(err)return console.log(err);
      done(null , data);

    })
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new: true}, (err, data) => {
    if(err) return console.log(err);
    done(null , data);
  }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,  (err, data) => {
    if(err) return Console.log(err);
    done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, data) =>{

    if(err) return console.log(err);
    done(null , data);
  }
    )
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ age: 55 })
  .sort({ name: -1 })
  .limit(5)
  .select({ favoriteFoods: foodToSearch })
  .exec(function(error, data) {
    if(error) return console.log(error)
     done(null , data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
