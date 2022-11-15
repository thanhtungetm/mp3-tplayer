import styles from './LoginModal.module.css'
import cls from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faLock, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import MusicPlayerContext from '../../context/MusicPlayerContext'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../redux/userSlice'

function LoginModal() {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatchRedux = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const {
        state: { openLogin },
        dispatch,
    } = useContext(MusicPlayerContext)

    const handleCloseLogin = () => {
        dispatch({ type: 'TOGGLE_LOGIN' })
    }

    const handleLogin = async (data) => {
        try {
            setLoading(true)
            const res = await axios.post('/api/login', data)
            setLoading(false)
            const userInfo = res.data.user
            dispatchRedux(update(userInfo))
            handleCloseLogin()
        } catch (error) {
            console.log(error)
            setErr(true)
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            {!loading && (
                <div className={styles['container']}>
                    <div className={styles['screen']}>
                        <div className={styles['screen__content']}>
                            <form className={cls('text-purple-700', styles['login'])}>
                                <div className={styles['login__field']}>
                                    <FontAwesomeIcon
                                        className={styles['login__icon']}
                                        icon={faUser}
                                    />
                                    <input
                                        {...register('username', {
                                            required: true,
                                            pattern: /^([\w]*)$/,
                                        })}
                                        type="text"
                                        className={styles['login__input']}
                                        placeholder="User name"
                                    />
                                </div>
                                {errors.username && (
                                    <div className="text-red-500 bg-purple-50 rounded-xl">
                                        {errors.username.type === 'pattern' && (
                                            <span>
                                                Username gom cac chu cai, khong co khoang trang,
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className={styles['login__field']}>
                                    <FontAwesomeIcon
                                        className={styles['login__icon']}
                                        icon={faLock}
                                    />
                                    <input
                                        {...register('password', { required: true })}
                                        type="password"
                                        className={styles['login__input']}
                                        placeholder="Password"
                                    />
                                </div>
                                {err && (
                                    <div className="text-red-500 bg-purple-50 rounded-xl">
                                        Username hoac password khong dung!
                                    </div>
                                )}
                                <button
                                    onClick={handleSubmit(handleLogin)}
                                    className={cls(styles['button'], styles['login__submit'])}
                                >
                                    <span className={styles['button__text']}>Log In Now</span>
                                    <FontAwesomeIcon
                                        className={styles['button__icon']}
                                        icon={faChevronRight}
                                    />
                                </button>
                            </form>
                        </div>
                        <div className={styles['screen__background']}>
                            <span
                                className={cls(
                                    styles['screen__background__shape'],
                                    styles['screen__background__shape4']
                                )}
                            ></span>
                            <span
                                className={cls(
                                    styles['screen__background__shape'],
                                    styles['screen__background__shape3']
                                )}
                            ></span>
                            <span
                                className={cls(
                                    styles['screen__background__shape'],
                                    styles['screen__background__shape2']
                                )}
                            ></span>
                            <span
                                className={cls(
                                    styles['screen__background__shape'],
                                    styles['screen__background__shape1']
                                )}
                            ></span>
                        </div>
                        <div className="absolute top-0 right-0 w-7 h-7 flex justify-center items-center z-50">
                            <FontAwesomeIcon
                                className="text-xl cursor-pointer"
                                icon={faTimes}
                                onClick={handleCloseLogin}
                            />
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/30 ">
                    <div className="relative w-fit px-3 py-3 text-center shadow-lg rounded-sm">
                        <div className="w-full grow flex justify-center items-center h-60">
                            <div className="w-20 h-20 border-4 border-purple-500  animate-spin"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginModal
