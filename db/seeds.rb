# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


10.times {
  user = User.create(
    name: Faker::Name.name,
    email: Faker::Internet.free_email,
    password: "password"
  )
  user.save!
  5.times {
    user.articles.create(
      title: Faker::Company.bs,
      logo: Faker::Company.logo,
      content: Faker::Hacker.say_something_smart
    )
  }
}
