//Types.mo

module {
  public type HttpHeader = {
      name : Text;
      value : Text;
  };

  public type HttpMethod = {
      #get;
      #post;
      #head;
  };

  public type HttpResponsePayload = {
      status : Nat;
      headers : [HttpHeader];
      body : [Nat8];
  };

  public type HttpRequestArgs = {
      url : Text;
      max_response_bytes : ?Nat64;
      headers : [HttpHeader];
      body : ?[Nat8];
      method : HttpMethod;
      transform : ?TransformContext;
  };

  public type TransformContext = {
      function : shared query (TransformArgs) -> async HttpResponsePayload;
      context : Blob;
  };

  public type TransformArgs = {
      response : HttpResponsePayload;
      context : Blob;
  };

  public type IC = actor {
      http_request : HttpRequestArgs -> async HttpResponsePayload;
  };
  public type PersonData = {
    id: Nat;
    edad: Nat;
    sexo: Text;
    emocion: Text;
    };

}
