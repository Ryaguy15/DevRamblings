require 'rails_helper'

RSpec.describe User, type: :model do
  # the name, email, and password_digest cannot be blank
  it {should validate_presence_of(:email)}
  it {should validate_presence_of(:name)}
  it {should validate_presence_of(:password_digest)}

  # There cannot be two users with the same email address
  it {should validate_uniqueness_of(:email)}

  # A User can have many blogs
  it { should have_many(:blogs) }

end
