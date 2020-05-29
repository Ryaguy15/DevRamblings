module V1
  class BlogsController < ApiController

    before_action :set_blog, only: [:show, :update, :destroy]

    skip_before_action :authorize_request, only: [:index, :show]

    def index
      @blogs = Blog.all
      json_response(@blogs)
    end

    def create
      @blog = Blog.create!(blog_params)
      json_response(@blog, :created)
    end

    def show
      json_response(@blog)
    end

    def update
      @blog.update(blog_params)
      head :no_content
    end

    def destroy
      @blog.destroy
      head :no_content
    end

    private

    def blog_params
      id = @current_user.id
      blog_params = params.permit(:title, :body)
      blog_params[:user_id] = id
      blog_params
    end

    def set_blog
      @blog = Blog.find(params[:id])
    end

  end
end
