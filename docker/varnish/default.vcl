vcl 4.0;

backend default {
  .host = "node";
  .port = "9090";
  .probe = {
       .url = "/check";
       .timeout = 1s;
       .interval = 3s;
       .window = 3;
       .threshold = 2;
  }
}

sub vcl_recv {
  if (req.method == "PURGE") {
    return (purge);
  }

  if (req.method == "BAN") {
      if (req.http.X-Cache-Tags) {
          ban("obj.http.X-Cache-Tags ~ " + req.http.X-Cache-Tags);
      } else {
          ban("obj.http.X-Host ~ " + req.http.X-Host
              + " && obj.http.X-Url ~ " + req.http.X-Url
          );
      }

      return (synth(200, "Banned"));
  }

  if (req.method == "PRI") {
      return (synth(405));
  }

  if (req.method != "GET" &&
    req.method != "HEAD" &&
    req.method != "PUT" &&
    req.method != "POST" &&
    req.method != "TRACE" &&
    req.method != "OPTIONS" &&
    req.method != "DELETE") {
      return (pipe);
  }

  if (req.method != "GET" && req.method != "HEAD") {
      return (pass);
  }

  if (req.url !~ "^/images/" ){
      return (pass);
  }

  set req.backend_hint = cluster_node.backend();

  return (hash);
}

sub vcl_hash {
    hash_data(req.url);
    return (lookup);
}

sub vcl_deliver {

    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
}
