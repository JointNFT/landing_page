<template>
	<div>
		<v-container>
			<v-card
				class="mx-auto"
				max-width="1100"
				min-height="600"
				color="#f0f8ff"
				style="border-radius: 50px"
			>
				<v-row class="pl-12 ml-10 pt-10">
					<v-card-text style="font-size: 2.2em; font-weight: bold">
						Please Enter OTP
					</v-card-text>
				</v-row>
				<v-row class="pl-16 ml-10">
					<v-form class="pa-0 pt-16">
						<v-text-field
							v-model="otp"
							style="width: 400px; border-radius: 10px"
							outlined
							filled
							color="deep-purple"
							label="OTP"
							solo
						>
						</v-text-field>
					</v-form>
				</v-row>
				<v-row class="pl-14 ml-10">
					<v-card-actions>
						<v-btn
							@click="submit"
							style="border-radius: 10px; text-transform: none"
							x-large
							height="60px"
							width="400"
							class="white--text"
							color="black accent-4"
							depressed
						>
							Continue
						</v-btn>
					</v-card-actions>
				</v-row>
			</v-card>
		</v-container>
	</div>
</template>
<script>
export default {
	name: 'nextpage',
	data: () => ({
		otp: '',
		phone: '',
	}),
	methods: {
		submit() {
			console.log(this.$route.query);
			// alert("wait");
			this.$store
				.dispatch('otpEntry', {
					otp: this.otp,
					phone: this.$route.query.phone,
				})
				.then(() => {
					// console.log(this.$route.params.id)
					this.$router.push({ path: '/dashboard' });
				});
			// alert("wait");
		},
		onSelect({ name, iso2, dialCode }) {
			console.log(name, iso2, dialCode);
		},
	},
};
</script>
