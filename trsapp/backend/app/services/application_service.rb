# サービスクラスをクラスメソッドとして直接呼び出せるようにする
# app/services/service.rb
class ApplicationService
  def self.call(*args, **kwargs)
    new(*args, **kwargs).call
  end
end