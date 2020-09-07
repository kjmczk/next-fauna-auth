import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from './header.module.css';

const Header = () => {
  const router = useRouter();

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher);

  const logout = async () => {
    const res = await fetch('/api/logout');
    if (res.ok) {
      mutateUser(null);
      router.push('/login');
    }
  };

  return (
    <div className={styles.header}>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>

          <ul>
            {user ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>{user.email}</a>
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <a>Signup</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
