import AuthForm from '@/components/ui/AuthForm'

const SignUp = async () => {
  return (
    // <div> sign up</div>
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  )
}

export default SignUp