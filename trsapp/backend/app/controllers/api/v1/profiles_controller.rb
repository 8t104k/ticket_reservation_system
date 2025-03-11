require 'zlib'
class Api::V1::ProfilesController < ApplicationController
  def show_http
    uri = URI.parse("#{ENV["SUPABASE_URL"]}/rest/v1/profiles?username=eq.#{params[:username]}&select=*")
    request = Net::HTTP::Get.new(uri)
    request["apikey"] = ENV["SUPABASE_SERVICE_ROLE_KEY"]
    request["Authorization"] = "Bearer #{ENV["SUPABASE_SERVICE_ROLE_KEY"]}"
    request["Content-Type"] = "application/json; charset=UTF-8"
    request["Accept"] = "application/json; charset=UTF-8"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(request)
    end
    read_response = Zlib::GzipReader.new(StringIO.new(response.body)).read
    render json: read_response

  end
  def show
    # puts Profile.find_by_username(username: params[:username])
    @profile = Profile.find_by_username(username: params[:username])
    render json: @profile
  end
  
  def index
    @profiles = Profile.all
    render json: @profiles
  end
end
