import styles from "../../styles/components/Foot.module.css"
import { Row, Col } from "antd";

export default function Footer() {
  return(
    <div className={styles.footer}>
			<Row style={{width: "100%"}}>
				<Col span={8}>
					<div className={styles.footerlinks}>
						<a className={styles.link} href="/company/about_us">
							<span translate="About us">About us</span>
						</a>
						<a className={styles.link}  href="https://www.blog.kaligo.com" target="_blank">
							<span translate="Blog">Blog</span>
							<sup translate="New">New</sup>
						</a>
						<a className={styles.link} href="/press/releases">
							<span translate="Press">Press</span>
						</a>
						<a className={styles.link}  href="/terms/privacy" ng-show="!(selectedLocale.lang_code == 'ja')">
							<span translate="Privacy policy">Privacy policy</span>
						</a>
						<a className={styles.link}  href="/terms/terms_condition" ng-show="!(selectedLocale.lang_code == 'ja')">
							<span translate="Terms of use">Terms of Use</span>
						</a>
						<a className={styles.link}  href="/company/faqs">
							<span translate="FAQs">FAQs</span>
						</a>
						<a className={styles.link}  href="/company/contact_us">
							<span translate="Contact us">Contact us</span>
						</a>
					</div>
				</Col>

				<Col span={8}>
					<div style={{textAlign: "center"}}>
						<span className={styles.link} >© 2021 ITSA</span>
						<span className={styles.link} >All rights reserved</span>
						<span className={styles.link} >&nbsp;|&nbsp;</span>
					</div>
				</Col>

				<Col span={8}>
					<div style={{float: "right"}}>
						<span translate="footer.kaligo_com_brand"> <a href="http://www.kaligo.com/" target="_blank"> Ascenda.com </a> is a brand of <a href="http://www.ascendaloyalty.com/" target="_blank"> Ascenda </a></span>
					</div>
				</Col>
			</Row>
			

			
			
		

			
    </div>
  )
}