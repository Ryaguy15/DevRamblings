require 'rails_helper'

RSpec.describe 'Blogs Api', type: :request do
  let!(:blogs) { create_list(:blog, 10) }
  let(:blog_id) { blogs.first.id }

  describe 'GET /blogs' do
    before { get '/blogs' }

    it 'returns the blogs' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns a 200 code' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /blogs/:id' do

    before { get "/blogs/#{blog_id}" }

    context 'When the blog exists' do
      it 'returns the blog' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(blog_id)

      end

      it 'returns a 200 code' do
        expect(response).to have_http_status(200)
      end
    end

    context 'When the record does not exists' do
      let(:blog_id) { 100 }

      it 'returns 404 code' do
        expect(response).to have_http_status(404)
      end

      it 'returns an error message' do
        expect(response.body).to match(/Couldn't find Blog/)
      end
    end
  end

  describe 'POST /blogs' do
    let(:valid_attributes) { {title: Faker::Lorem.sentence, body: Faker::Lorem.paragraph} }

    context 'When request is valid' do
      before { post '/blogs', params: valid_attributes }
      it 'creates a blog' do
        expect(json['title']).to eq(valid_attributes[:title])
        expect(json['body']).to eq(valid_attributes[:body])
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/blogs', params: { title: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Body can't be blank/)
      end
    end
  end

  describe 'PUT /blogs/:id' do
    let(:valid_attributes) { { title: 'This is a cool blog' } }

    context 'When the record exists' do
      before { put "/blogs/#{blog_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /blogs/:id' do

    before { delete "/blogs/#{blog_id}"}

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end