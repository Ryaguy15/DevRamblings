require 'rails_helper'

RSpec.describe Blog, type: :model do
  # There should be a title and body to a blog
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:body) }


end
