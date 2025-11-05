import { Alert, Image, Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import ScreenWrapper from "@/components/screen-wrapper"
import Typo from "@/components/typo"
import { colors, spacingX, spacingY } from "@/constants/theme"
import { verticalScale } from "@/utils/styling"
import Input from "@/components/input"
import * as Icons from "phosphor-react-native"
import Button from "@/components/button"
import { useRouter } from "expo-router"
import { useAuth } from "@/context/auth-context"
import { z, ZodError } from "zod"

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

const SignUp = () => {
  const router = useRouter()
  const { signUp } = useAuth()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      const parsed = signUpSchema.parse({ name, email, password })

      setLoading(true)
      const res = await signUp(
        parsed.email.trim(),
        parsed.password,
        parsed.name.trim(),
      )

      if (!res.success) {
        Alert.alert("Error", res.msg || "Something went wrong")
      } else {
        router.replace("/(tabs)")
      }
    } catch (err) {
      if (err instanceof ZodError) {
        Alert.alert("Validation Error", err.issues[0].message)
      } else {
        Alert.alert("Error", "Network error. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/public/images/splash-icon.png")}
            style={styles.logo}
          />
          <Typo size={42} fontWeight={"800"}>
            Finote
          </Typo>
          <Typo size={18} color={colors.neutral400}>
            Spend smarter, Live easy
          </Typo>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Enter your name"
            onChangeText={(value) => {
              setName(value)
            }}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral350}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => {
              setEmail(value)
            }}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral350}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your password"
            type="password"
            onChangeText={(value) => {
              setPassword(value)
            }}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral350}
                weight="fill"
              />
            }
          />
          <Button onPress={handleSubmit} loading={loading}>
            <Typo fontWeight={"700"} color={colors.white} size={21}>
              Create an account
            </Typo>
          </Button>
        </View>

        <View style={styles.authOptions}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} color={colors.primary} fontWeight={"700"}>
              Login
            </Typo>
          </Pressable>
        </View>

        {/* <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Typo size={15}>Or login with</Typo>
          <View style={styles.dividerLine} />
        </View> */}

        {/* <View style={styles.socialButtonContainer}>
          <Pressable onPress={handleGoogleSignIn}>
            <Image
              source={require("@/public/images/google.png")}
              style={styles.socialButton}
            />
          </Pressable>
        </View> */}
      </View>
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  logoContainer: {
    gap: 5,
    marginTop: spacingY._30,
    marginBottom: spacingY._10,
    alignItems: "center",
  },
  logo: {
    width: verticalScale(100),
    height: verticalScale(100),
  },
  form: {
    gap: spacingY._20,
  },
  authOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  divider: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dividerLine: {
    height: 1,
    flex: 1,
    backgroundColor: colors.neutral700,
    marginHorizontal: spacingX._10,
  },
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  socialButton: {
    width: verticalScale(40),
    height: verticalScale(40),
  },
})
