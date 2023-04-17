// Membuat dan menggunakan database
// use sinar_harapan_makmur

// Cek database
// show dbs

// Buat collection
db.createCollection("vehicle")

// Atau kita bisa lakukan insert sekaligus membuat collection
// insertOne -> memasukkan 1 buah data
db.brand.insertOne({name: "Honda" })
db.brand.insertOne({ _id: 'B0001', name: 'Mazda', stock: 12})

// insertMany
db.brand.insertMany([
    { name: "BMW" },
    { name: "Mercedez" },
    { name: "Daihatsu" }
])

// updateOne & updateMany
db.brand.updateOne(
    { _id: ObjectId("643cb7bd703466febef2b432") },
    { $set: { name: "BMW", stock: 12 }}
)

// Kita akan menghapus field stock pada collection brand
db.brand.updateOne(
  {
    _id: ObjectId("643cb7bd703466febef2b432")
  },
  {
      $set: { id: 1 }
  }
)

db.brand.insertMany([
    {
        _id: 1,
        name: "Toyota"
    },
    {
        _id: 2,
        name: "Honda"
    },
    {
        _id: 3,
        name: "BMW"
    },
    {
        _id: 4,
        name: "Mazda"
    },
    {
        _id: 5,
        name: "Daihatsu"
    }
])

// deleteOne & deleteMany
db.brand.deleteOne({ name: "Toyota" })