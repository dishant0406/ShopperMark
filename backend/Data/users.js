import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: "Dishant Sharma",
    email: "dishant@gmail.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "Vishal Sharma",
    email: "vishal@gmail.com",
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users