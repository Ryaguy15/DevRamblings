Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: {format: 'json'} do
    resources :blogs
    post 'auth/login', to: 'authentication#authenticate'
    post '/signup', to: 'user#create'
  end




  root 'home#index'

  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr && req.format.html?
  end

end
