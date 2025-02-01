import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ReturnPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      fetch(`/api/checkout_sessions?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSession(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [session_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Payment Status</h1>
      {session ? (
        <div>
          <p>Status: {session.status}</p>
          <p>Customer Email: {session.customer_email}</p>
        </div>
      ) : (
        <p>No session found</p>
      )}
    </div>
  );
}
