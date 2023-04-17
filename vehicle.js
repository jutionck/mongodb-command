db.vehicle.insertMany([
    {
        _id: 1,
        brand: "Honda",
        model: "Brio RS",
        productionYear: 2023,
        isAutomatic: true,
        price: 250000000,
        stock: 10,
        status: "baru"
    },
    {
        _id: 2,
        brand: "Honda",
        model: "Mobilio RS",
        productionYear: 2021,
        isAutomatic: false,
        price: 275000000,
        stock: 10,
        status: "bekas"
    },
    {
        _id: 3,
        brand: "Toyota",
        model: "Innova Zenix",
        productionYear: 2023,
        isAutomatic: true,
        price: 550000000,
        stock: 5,
        status: "baru"
    },
    {
        _id: 4,
        brand: "BMW",
        model: "i5",
        productionYear: 2023,
        isAutomatic: true,
        price: 859000000,
        stock: 3,
        status: "baru"
    },
    {
        _id: 5,
        brand: "Mazda",
        model: "CX 5",
        productionYear: 2020,
        isAutomatic: true,
        price: 370000000,
        stock: 2,
        status: "bekas"
    }
])

// Operator: =, >, <, >=, <=, in, !=, not in
// mongoDB: $eq, $gt, $lt, $gte, $lte, $in, $ne, $nin
// Penggunaan: db.collection.find({ field: { $operator: "value" } })

// SELECT * FROM vehicle WHERE brand = "Honda";
db.vehicle.find({ brand: { $eq: "Honda" } })

// SELECT * FROM vehicle WHERE price >= 500000000;
db.vehicle.find(
    {
        price: {
            $gte: 500000000
        }
    }
)

// SELECT * FROM vehicle WHERE price >= 300000000 AND price <= 550000000
db.vehicle.find(
    {
        price: {
            $gte: 300000000,
            $lte: 550000000
        },
        brand: "Honda"
    })

// SELECT id, brand, model, price FROM vehicle WHERE price >= 500000000;
// projection: field (1) atau (0)
db.vehicle.find(
    {
        price: {
            $gte: 500000000
        }
    },
    {
        _id: 0,
        brand: 1,
        model: 1,
        price: 1
    }
)

// SELECT * FROM vehicle WHERE brand IN ('Honda', 'BMW')
db.vehicle.find(
    {
        brand: {
            $in: ["Honda", "BMW"]
        }
    })

// AND, OR
// SELECT * FROM vehicle
// WHERE (brand = "Honda" and status = "bekas) OR (brand = "Toyota" and status = "baru)
db.vehicle.find(
  {
    $or: [
      {
        $and: [ { brand: "Honda" }, { status: "bekas" } ]
      },
      {
        $and: [ { brand: "Toyota" }, { status: "baru" } ]
      }
    ]
  }
)

db.vehicle.find(
  {
    $or: [
      { brand: "Honda", status: "bekas" },
      { brand: "Toyota", status: "baru" }
    ]
  }
)

// LIKE
// mongodb: regex
// Penggunaan: db.collection.find({ field: { regex: /pattern/, $option } })
// i: incase-sensitive

// SELECT * FROM vehicle WHERE model ILIKE 'I%' -> Innova, i5 (awalan huruf i)
db.vehicle.find(
  {
    model: {
      $regex: /^i/i
    }
  }
)

// SELECT * FROM vehicle WHERE model ILIKE '%I' -> i5, CX 5 (akhiran 5)
db.vehicle.find(
  {
    model: {
      $regex: /5$/i
    }
  }
)

// SELECT * FROM vehicle WHERE model ILIKE '%rs%' -> Brio RS, Mobilio RS
db.vehicle.find(
  {
    model: {
      $regex: /rs/i
    }
  }
)

// PAGINATION
// mongodb: limit & skip
db.vehicle.find().limit(2)
db.vehicle.find().skip(2).limit(2)

// SORT
// mongodb: ASC (1), DESC (-1)
db.vehicle.find().skip(3).limit(2).sort({model: 1})

// SELECT id, model FROM vehicle
db.vehicle.find({}, {_id: 1, model: 1})

// Aggregate -> Count, SUM, AVG dll
// SELECT COUNT(*) ...
// penggunaan: db.collection.countDocuments({})
db.vehicle.countDocuments({})
db.vehicle.count() // deprecated Use countDocuments()

// DISTINCT
db.vehicle.distinct("brand")

// Penggunaan: db.collection.aggregate([ ... ])
// SUM
// _id: digunakan sebagai pengelompokkan atau sebagai grup (field) -> $nama_field
db.vehicle.aggregate([
  {
    $group: {
      _id: 1,
      total: { $sum: "$price" }
    }
  }
])

db.vehicle.aggregate([
  {
    $group: {
      _id: "$brand",
      min: { $min: "$price" }
    }
  }
])

// Penambahan sebuah WHERE CLAUSE -> $match
db.vehicle.aggregate([
  {
    $match: {
      brand: "Honda"
    }
  },
  {
    $group: {
      _id: "$brand",
      total: { $sum: "$price" }
    }
  }
])

// SORT
db.vehicle.aggregate([
  {
    $group: {
      _id: "$brand",
      total: { $sum: "$price" }
    }
  },
  {
    $sort: { _id: -1 }
  }
])

// JOIN
// Modifikasi vehicle
db.vehicle.insertMany([
  {
    _id: 1,
    brandId: 2,
    model: "Brio RS",
    productionYear: 2023,
    isAutomatic: true,
    price: 250000000,
    stock: 10,
    status: "baru"
  },
  {
    _id: 2,
    brandId: 2,
    model: "Mobilio RS",
    productionYear: 2021,
    isAutomatic: false,
    price: 275000000,
    stock: 10,
    status: "bekas"
  },
  {
    _id: 3,
    brandId: 1,
    model: "Innova Zenix",
    productionYear: 2023,
    isAutomatic: true,
    price: 550000000,
    stock: 5,
    status: "baru"
  },
  {
    _id: 4,
    brandId: 3,
    model: "i5",
    productionYear: 2023,
    isAutomatic: true,
    price: 859000000,
    stock: 3,
    status: "baru"
  },
  {
    _id: 5,
    brandId: 4,
    model: "CX 5",
    productionYear: 2020,
    isAutomatic: true,
    price: 370000000,
    stock: 2,
    status: "bekas"
  }
])

db.vehicle.aggregate([
  {
    $lookup:
      {
        from: "brand",
        localField: "brandId",
        foreignField: "_id",
        as: "brand"
      }
  }
])
