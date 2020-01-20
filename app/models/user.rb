class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # Model association
  has_many :blogs, foreign_key: :user_id

  # validations
  validates :email, :name, :password_digest, presence: true
  validates :email, uniqueness: true

end
